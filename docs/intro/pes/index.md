# Potential energy surface

A potential energy surface (PES) is a mathematical function that describes the potential energy of a molecular system as a function of its atomic coordinates.
In other words, it represents the energy landscape of a molecule, showing how the potential energy changes as the atoms move and interact with each other.

Potential energy is the energy stored within a system due to its position or configuration.
In a molecular system, potential energy arises from various interactions, including:

-   **Bond stretching:** Energy associated with the stretching or compression of chemical bonds.
-   **Angle bending:** Energy related to the distortion of bond angles.
-   **Dihedral torsion:** Energy resulting from the rotation around chemical bonds.
-   **Van der Waals forces:** Attractive or repulsive forces between atoms due to temporary dipoles.
-   **Electrostatic interactions:** Energy associated with the interaction of charged atoms or partial charges.

The total potential energy of a molecular system is the sum of all these individual energy contributions.

## Representation

A PES is typically represented as a multidimensional surface, where each dimension corresponds to a degree of freedom in the molecular system (e.g., bond lengths, angles, or atomic coordinates).
The potential energy is plotted on the vertical axis, while the atomic coordinates are plotted on the horizontal axes.

For a simple diatomic molecule, the PES can be visualized as a 2D curve, with the interatomic distance on the x-axis and the potential energy on the y-axis.
As the atoms move closer or farther apart, the potential energy changes, forming a characteristic well-shaped curve.

For more complex molecules with many atoms and degrees of freedom, the PES becomes a high-dimensional surface that is challenging to visualize and interpret.
In such cases, lower-dimensional projections or slices of the PES can be used to gain insights into specific molecular motions or reaction pathways.

## Significance

Potential energy surfaces play a crucial role in molecular dynamics (MD) simulations, as they determine the forces acting on atoms and govern their motion.

The PES is defined by a force field, which is a set of mathematical functions and parameters that describe the potential energy of a system based on its atomic coordinates. Force fields are derived from a combination of experimental data and quantum mechanical calculations.

MD simulations often start with an energy minimization step, where the atomic coordinates are adjusted to find a local minimum on the PES. This process helps to remove any initial strain or instabilities in the molecular structure.

During an MD simulation, the atoms move according to the forces acting on them, which are determined by the gradient of the PES. The atoms tend to move towards regions of lower potential energy, following the contours of the PES.

The PES determines the accessible conformations of a molecule. MD simulations allow the system to explore different regions of the PES, sampling various conformations and overcoming energy barriers through thermal fluctuations.

The PES can provide insights into chemical reactions and transition states. By analyzing the PES, one can identify reaction pathways, energy barriers, and transition states, which are crucial for understanding the kinetics and mechanisms of chemical reactions.
