class ContextSensitiveLSystem {

	#rules;

	constructor({ rules, axiom, random }) {

		this.#rules = new Map();

		this.rules = rules;
		this.axiom = axiom;
		this.random = random;

	}

	iterate( amount, axiom ) {



	};

}

const cslsys = new ContextSensitiveLSystem({

	rules: [{

		source: 'A',
		target: 'ABBA',
		context: [ ['A', -2], ['B', -1], ['A', 3] ]

	}],

	mode: ''

	axiom: 'AB'

});