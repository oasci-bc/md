# Internal

The Z-matrix coordinate system, also known as internal coordinates, is an alternative way to represent the geometry of a molecule in molecular dynamics (MD) simulations.
Unlike the Cartesian coordinate system, which specifies the position of each atom using X, Y, and Z coordinates, the Z-matrix uses bond lengths, bond angles, and dihedral angles to describe the relative positions of atoms.

## Definition

In a Z-matrix, each atom's position is defined relative to the positions of other atoms in the molecule.
The first atom is placed at the origin, the second atom is defined by its bond length to the first atom, the third atom is defined by its bond length to the second atom, the bond angle formed with the first atom, and so on.

A Z-matrix entry for an atom typically consists of the following information:

-   Atom type
-   Bond length to the reference atom
-   Bond angle formed with the reference atom and another specified atom
-   Dihedral angle formed with three previously defined atoms

For example, a simple Z-matrix for a water molecule (H2O) might look like this:

```text
O
H 1 0.96
H 1 0.96 2 104.5
```

In this Z-matrix, the oxygen atom (O) is placed at the origin, the first hydrogen atom (H) is defined by its bond length to the oxygen atom (0.96 Å), and the second hydrogen atom is defined by its bond length to the oxygen atom (0.96 Å) and the bond angle formed with H (104.5°).

## Advantages

The Z-matrix provides a compact way to represent the geometry of a molecule, especially for small to medium-sized molecules with a limited number of degrees of freedom.

The Z-matrix is intuitive for describing bonded interactions, such as bond stretching, angle bending, and dihedral torsions, as it directly represents these internal coordinates.

The Z-matrix is particularly useful for constrained geometry optimizations, where certain internal coordinates (e.g., bond lengths or angles) are fixed while others are optimized.

## Limitations

The Z-matrix becomes increasingly complex and less intuitive for larger molecules with many atoms and degrees of freedom. Defining a consistent and unambiguous Z-matrix for large, flexible molecules can be challenging.

The Z-matrix may include redundant coordinates, such as multiple ways to define the same dihedral angle, leading to inconsistencies and numerical instabilities in calculations.

The Z-matrix is less suitable for describing non-bonded interactions, such as van der Waals forces and electrostatic interactions, which depend on the absolute positions of atoms rather than their relative positions.

Converting between Z-matrix and Cartesian coordinates requires coordinate transformations, which can be computationally expensive for large molecules and may introduce numerical errors.

In MD simulations, the Z-matrix coordinate system is less commonly used than the Cartesian coordinate system. This is because MD simulations typically involve large, flexible molecules and require calculating non-bonded interactions, which are more straightforward to compute using Cartesian coordinates.
