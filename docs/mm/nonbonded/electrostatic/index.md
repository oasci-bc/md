# Electrostatic

Interactions resulting from non-uniform distribution of electron densities between molecules are considered electrostatic.
We primarily hear about this as an "unequal sharing of electrons" in chemistry.

One common approach is to approximate these interactions by assigning partial charges to each atom based on its type and connectivity.
If we assume each atom is an infinitesimally small point in space, we can compute the electrostatic energy, $E_{el}$ between two atoms $A$ and $B$ using Coulomb's potential:

$$
E_{el} \left( R_{AB} \right) = \frac{Q_A Q_B}{\varepsilon R_{AB}}.
$$

$E_{el}$ is directly proportional to the product of atom charges $Q_A$ and $Q_B$.
This relationship also indicates that having two charges of the same sign result in positive (i.e., unfavorable) energy, which is why they repel.
The distance, $R_{AB}$ between the point charges is inversely proportional to $E_{el}$; as the charges move further away $E_{el}$ will decrease.

Much of these aspects can be intuitively understood by our experience with magnets.
When two magnets with the same poles are brought close together, they repel each other, similar to how like charges repel in electrostatic interactions.
Conversely, opposite poles attract, mirroring the attraction between opposite charges.

TODO: Add paragraph about the dielectric constant, but mention that we will discuss more later.

## Visualization

TODO: Introduce the visualization and check computed forces and energies.

<div id="charge-container"></div>
<script src="./charge-field.js"></script>

## Dielectric constant

TODO: Add explanation and visualization of how the dielectric constant of the medium impacts electrostatic interactions.

<div id="dielectric-container"></div>
<script src="./dielectric.js"></script>

## Limitations

However, it is essential to note the limitations of this model.
In reality, atoms are not point charges but have a finite size and complex electron cloud distributions.
The model simplifies the actual distribution of electron density around atoms, which can significantly affect the true nature of electrostatic interactions.
Additionally, the medium in which these interactions occur (represented by the dielectric constant $\varepsilon$) can vary, affecting the strength of the interactions.
Finally, the model does not account for quantum mechanical effects that influence electron distribution and energy states, making it a useful but oversimplified representation of the actual phenomena.

<!-- REFERENCES -->

[^jensen2017introduction]: Chapter 2 of Jensen, F. (2017). *Introduction to computational chemistry*. John Wiley & Sons.
[^cramer2013essentials]: Chapter 2 of Cramer, C. J. (2013). Chapter 2 of *Essentials of computational chemistry: Theories and models*. John Wiley & Sons.
[^leach2001molecular]: Chapter 4 of Leach, A. R. (2001). *Molecular modelling: Principles and applications*. Pearson Education.
