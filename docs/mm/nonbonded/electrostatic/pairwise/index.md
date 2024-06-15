# Pairwise additive

One common approach is to approximate these interactions by assigning partial charges to each atom based on its type and connectivity.
If we assume each atom is an infinitesimally small point in space, we can compute the electrostatic energy, $E_{el}$ between two atoms $i$ and $j$ using Coulomb's potential:

$$
V_{el} \left( R_{ij} \right) = \frac{Q_i Q_j}{\varepsilon_r 4 \pi \varepsilon_0 R_{ij}}.
$$

$V_{el}$ is directly proportional to the product of atom charges $Q_i$ and $Q_j$.
This relationship thus indicates that having two charges of the same sign result in positive (i.e., unfavorable) energy, which is why they repel.
The distance, $R_{ij}$ between the point charges is inversely proportional to $V_{el}$; as the charges move further away $V_{el}$ will decrease.

Much of these aspects can be intuitively understood by our experience with magnets.
When two magnets with the same poles are brought close together, they repel each other, similar to how like charges repel in electrostatic interactions.
Conversely, opposite poles attract, mirroring the attraction between opposite charges.

TODO: Add paragraph about the dielectric constant, but mention that we will discuss more later.


TODO: Introduce the visualization and check computed forces and energies.

<div id="charge-container"></div>
<script src="./charge-field.js"></script>

## Limitations

However, it is essential to note the limitations of this model.
In reality, atoms are not point charges but have a finite size and complex electron cloud distributions.
The model simplifies the actual distribution of electron density around atoms, which can significantly affect the true nature of electrostatic interactions.
Additionally, the medium in which these interactions occur (represented by the dielectric constant $\varepsilon$) can vary, affecting the strength of the interactions.
Finally, the model does not account for quantum mechanical effects that influence electron distribution and energy states, making it a useful but oversimplified representation of the actual phenomena.

## Fitting atomic charges

TODO:

-   [ESP](./esp/),
-   [RESP](./resp/),
-   [IPolQ](./ipolq/),
-   [RESP2](./resp2/).
