class ContextSensitiveLSystem {

	#rules;

	constructor({ rules, axiom, characters }) {

		this.#rules = new Map();

		this.rules = rules;
		this.axiom = axiom;
		this.characters = characters;

	}

	set rules( rules ) {

		for ( let i = 0; i < rules.length; i ++ ) {

			const source = rules[ i ][ 0 ];
			const target = rules[ i ][ 1 ];

			const split = source.split( this.characters.bracket );
			let left, middle, right;
			const context = [];


			if ( split.length === 3 ) {

				left = split[ 0 ];
				middle = split[ 1 ];
				right = split[ 2 ];

			} else if ( split.length === 2 ) {

				if ( split[ 0 ].length === 1 ) {

					middle = split[ 0 ];
					right = split[ 1 ];

				} else {

					left = split[ 0 ];
					middle = split[ 1 ];

				}

			}

			if ( left ) {

				for ( let j = 0; j < left.length; j ++ ) {

					if ( left[ j ] !== this.characters.any ) {

						context.push([ left[ j ] ], -left.length + j )

					}

				}

			}

			if ( right ) {

				for ( let j = 0; j < right.length; j ++ ) {

					if ( right[ j ] !== this.characters.any ) {

						context.push([ right[ j ] ], j + 1 )

					}

				}

			}

			const rule = {

				context: context,
				target: target

			};

			if ( this.#rules.has( middle ) ) {

				this.#rules.get( middle ).push( rule );

			} else this.#rules.set( middle, [ rule ] );

		}

	};

	get rules() {

		return this.#rules;
	}

	iterate( amount, axiom ) {



	};

}

const rule = LSystemRule({

	context:
	source:
	target:
	weight:

});

const ruleA = ['**|A|*', 'A(x+1,y-1)B']




const cslsys = new ContextSensitiveLSystem({

	characters: {
		any: '*',
		bracket: '|'
	},

	rules: [['ABB<A>*CC', 'ABBA']],

	axiom: 'AB'

});

