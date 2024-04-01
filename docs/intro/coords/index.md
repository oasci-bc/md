# Coordinates

In molecular dynamics (MD) simulations, coordinate systems play a crucial role in representing the positions and trajectories of atoms or particles over time.
Understanding coordinate systems and their storage formats is essential for setting up, running, and analyzing MD simulations.

## Cartesian

The Cartesian coordinate system, also known as the rectangular coordinate system, is the most widely used method for representing the positions of atoms in molecular dynamics (MD) simulations. In this system, three orthogonal coordinates (X, Y, and Z) specify each atom's position relative to a fixed origin.

In the Cartesian coordinate system, the position of an atom is represented by an ordered triplet (x, y, z), where:

-   x is the distance from the origin along the X-axis
-   y is the distance from the origin along the Y-axis
-   z is the distance from the origin along the Z-axis

The X, Y, and Z axes are mutually perpendicular and extend to infinity in both positive and negative directions. The origin (0, 0, 0) is where all three axes intersect.

For example, the Cartesian coordinates of a water molecule (H2O) might be:

```text
O    0.000   0.000   0.000
H    0.757   0.586   0.000
H   -0.757   0.586   0.000
```

In this representation, the oxygen atom is placed at the origin (0, 0, 0), and the two hydrogen atoms are positioned relative to the oxygen atom using their X, Y, and Z coordinates.

### Advantages

Cartesian coordinates provide a simple and intuitive way to represent the positions of atoms in 3D space. The X, Y, and Z coordinates directly correspond to the spatial dimensions, making it easy to visualize and interpret molecular geometries.

Cartesian coordinates allow for efficient interatomic distances, angles, and forces computations. Many algorithms and software packages for MD simulations are optimized for Cartesian coordinates, enabling fast and scalable simulations.

Non-bonded interactions, such as van der Waals forces and electrostatic interactions, depend on the absolute positions of atoms. Cartesian coordinates make it straightforward to calculate these interactions based on the distances between atoms.

Cartesian coordinates are well-suited for simulations with periodic boundary conditions, where the simulation box is replicated in all directions to mimic an infinite system. Periodic boundary conditions are easily implemented using Cartesian coordinates.

### Limitations

Cartesian coordinates treat each atom independently, resulting in redundant degrees of freedom for bonded interactions. This can lead to numerical instabilities and slower convergence in geometry optimizations and constrained simulations.

Bonded interactions, such as bond stretching, angle bending, and dihedral torsions, are not directly represented by Cartesian coordinates. These interactions must be calculated based on the relative positions of bonded atoms, which can be less intuitive than using internal coordinates like the Z-matrix.

The number of Cartesian coordinates can become very large for large molecules with many atoms, leading to increased memory requirements and computational costs.

## Internal coordinates

The Z-matrix coordinate system, also known as internal coordinates, is an alternative way to represent the geometry of a molecule in molecular dynamics (MD) simulations.
Unlike the Cartesian coordinate system, which specifies the position of each atom using X, Y, and Z coordinates, the Z-matrix uses bond lengths, bond angles, and dihedral angles to describe the relative positions of atoms.

### Definition

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

### Advantages

The Z-matrix provides a compact way to represent the geometry of a molecule, especially for small to medium-sized molecules with a limited number of degrees of freedom.

The Z-matrix is intuitive for describing bonded interactions, such as bond stretching, angle bending, and dihedral torsions, as it directly represents these internal coordinates.

The Z-matrix is particularly useful for constrained geometry optimizations, where certain internal coordinates (e.g., bond lengths or angles) are fixed while others are optimized.

### Limitations

The Z-matrix becomes increasingly complex and less intuitive for larger molecules with many atoms and degrees of freedom. Defining a consistent and unambiguous Z-matrix for large, flexible molecules can be challenging.

The Z-matrix may include redundant coordinates, such as multiple ways to define the same dihedral angle, leading to inconsistencies and numerical instabilities in calculations.

The Z-matrix is less suitable for describing non-bonded interactions, such as van der Waals forces and electrostatic interactions, which depend on the absolute positions of atoms rather than their relative positions.

Converting between Z-matrix and Cartesian coordinates requires coordinate transformations, which can be computationally expensive for large molecules and may introduce numerical errors.

In MD simulations, the Z-matrix coordinate system is less commonly used than the Cartesian coordinate system. This is because MD simulations typically involve large, flexible molecules and require calculating non-bonded interactions, which are more straightforward to compute using Cartesian coordinates.
