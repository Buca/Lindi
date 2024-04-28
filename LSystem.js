class LSystem {

	#rules;

	constructor({ rules, axiom }) {

		this.#rules = new Map();

		this.rules = rules;
		this.axiom = axiom;

	};

	get rules() {

		return this.#rules;

	};

	set rules( rules ) {

		for ( const rule of rules ) {

			const source = rule[ 0 ];
			const target = rule[ 1 ];

			this.#rules.set( source, target );

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
				const result = this.rules.get( variable );

				if ( result ) next += result;
				else next += variable;

			}

			state = next;

		}

		return state;

	};

}


const lsys = new LSystem({

	rules: [ ['A', 'BC'], ['C', 'BB'], ['B', 'AX'] ]

});

console.log( lsys.iterate( 30, 'B' ) );