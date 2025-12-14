
from src.causalchange.causal_change import CausalChange
from src.causalchange.gen.generate import gen_example_continuous, to_json_G

seed = 42
n_nodes = 5

X, truths = gen_example_continuous(n_nodes=n_nodes, seed=seed)

cc = CausalChange()

G_hat = cc.fit(X)

to_json_G(G_hat, truths, cc)
