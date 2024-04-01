# Cartesian

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

## Advantages

Cartesian coordinates provide a simple and intuitive way to represent the positions of atoms in 3D space. The X, Y, and Z coordinates directly correspond to the spatial dimensions, making it easy to visualize and interpret molecular geometries.

Cartesian coordinates allow for efficient interatomic distances, angles, and forces computations. Many algorithms and software packages for MD simulations are optimized for Cartesian coordinates, enabling fast and scalable simulations.

Non-bonded interactions, such as van der Waals forces and electrostatic interactions, depend on the absolute positions of atoms. Cartesian coordinates make it straightforward to calculate these interactions based on the distances between atoms.

Cartesian coordinates are well-suited for simulations with periodic boundary conditions, where the simulation box is replicated in all directions to mimic an infinite system. Periodic boundary conditions are easily implemented using Cartesian coordinates.

## Limitations

Cartesian coordinates treat each atom independently, resulting in redundant degrees of freedom for bonded interactions. This can lead to numerical instabilities and slower convergence in geometry optimizations and constrained simulations.

Bonded interactions, such as bond stretching, angle bending, and dihedral torsions, are not directly represented by Cartesian coordinates. These interactions must be calculated based on the relative positions of bonded atoms, which can be less intuitive than using internal coordinates like the Z-matrix.

The number of Cartesian coordinates can become very large for large molecules with many atoms, leading to increased memory requirements and computational costs.
