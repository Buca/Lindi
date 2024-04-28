class StochasticLSystem {

	#rules;

	constructor({ random = Math.random, rules, axiom }) {

		this.#rules = new Map();

		this.random = random;
		this.rules = rules;
		this.axiom = axiom;

	};

	get rules() {

		return this.#rules;

	};

	set rules( rules ) {

		for ( const [ source, target, weight ] of rules ) {

			if ( this.rules.has( source ) ) {

				const dist = this.rules.get( source );
				const total = dist[ dist.length - 1 ][ 1 ];


				dist.push( [ target, total + weight ] );
			}

			else this.rules.set( source, [ [ target, weight ] ] );

		}

		// Normalize
		for ( const [ source, dist ] of this.rules ) {

			const invTotal = 1 / dist[ dist.length - 1 ][ 1 ];

			for ( const outcome of dist ) {

				outcome[ 1 ] *= invTotal;

			}

		}

	};

	iterate( amount, axiom ) {

		if ( !axiom ) axiom = this.axiom;

		amount = Math.max( 0, Math.ceil( amount ) );

		let state = axiom;

		for ( let i = 0; i < amount; i ++ ) {

			let next = '';

			for ( let j = 0; j < state.length; j ++ ) {

				const variable = state[ j ];
				const random = this.random();
				const cumulDist = this.rules.get( variable );
				let target;

				for ( const possibility of cumulDist ) {

					target = possibility[ 0 ];
					const probability = possibility[ 1 ];

					if ( probability < random ) break;

				}

				if ( target ) next += target;
				else next += variable;

			}

			state = next;

		}

		return state;

	};

}

const slsys = new StochasticLSystem({ 
	random: Math.random, 
	rules: [ ['A', 'BA', 10], ['A', 'XX', 17], ['X', 'ABBA', 1], ['B', 'XXA', 10], ['B', 'AXX', 10]]
});

console.log( slsys.iterate( 2, 'ABBA' ) )