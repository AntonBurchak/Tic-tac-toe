import React, { Component } from 'react';

import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ],
			current: 0,
			winner: '',
			isBlocked: 'false',
			whoNext: 'Cross',
			bodyColor: '#c1ffc1',
			winnerReady: false,
			isDraw: false
		};
		this.temp = this.state.squares;
	}

	clickHandler = (e) => {
		if (e.target.getAttribute('blocked') === null || e.target.getAttribute('blocked') == 'false') {
			let tmp = this.state.current % 2 == 0 ? 'Zero' : 'Cross',
				coord = e.target.getAttribute('data');

			e.target.setAttribute('blocked', true);
			e.target.setAttribute('value', tmp);

			this.temp[coord[0]][coord[2]] = this.state.current % 2 == 0 ? 2 : 1;
			this.setState(
				{
					winner: this.showWinner(this.checkWinner(this.temp)),
					whoNext: tmp == 'Zero' ? 'Cross' : 'Zero'
				}
			);
			this.showWinner(this.checkWinner(this.temp));
		} else {
			null;
		}
		this.componentDidMount();
	};

	checkWinner(board) {
		board = board.join('-').replace(/,/g, '');
		if (/222|2...2...2|2....2....2|2..2..2/.test(board)) return 1;
		if (/111|1...1...1|1....1....1|1..1..1/.test(board)) return 2;
		if (/0/.test(board)) return -1;
		return 0;
	}

	componentDidMount = () => {
		this.setState(function(state, props) {
			current: state.current++;
		});
	};

	showWinner = (winner) => {
		let win = '';
		if (winner == 1) {
			win = 'O';
			this.setState({
				isBlocked: 'true',
				whoNext: '',
				winnerReady: true,
			});
			document.body.style.background = this.state.bodyColor;
		}
		if (winner == 2) {
			win = 'X';
			this.setState({
				isBlocked: 'true',
				whoNext: '',
				winnerReady: true
			});
			document.body.style.background = this.state.bodyColor;
		}
		console.log(this.state.current);

		if (winner == 0 && this.state.current > 8) {
			win = 'Ничья';
			console.log(winner);
			this.setState({
				isBlocked: 'true',
				whoNext: '',
				winnerReady: false,
				isDraw: true
			});
		}

		return win;
	};

	restart = (e) => {
		this.setState({
			winner: 'Ничья',
			current: 0
		});
		this.temp = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
		this.showWinner(this.checkWinner(this.temp));
	};

	render() {
		let items = Object.values(this.state.squares);
		
		const renderResult = () => {
			let tmp = this.state.winnerReady;

			if(tmp) {
				return <p>Winner: {this.state.winner}</p>;
			} else if (this.state.isDraw){
				return <p>Draw!</p>
			}
		}
		return (
			<div className="tic-tac-toe">
				{items.map((element, index) => {
					return element.map((item, iterator) => {
						return (
							<div
								className="tt-greed"
								key={iterator}
								blocked={this.state.isBlocked}
								data={index + `-` + iterator}
								value=""
								onClick={this.clickHandler}
							/>
						);
					});
				})}

				<div className="both" />
				{this.state.whoNext.length !== 0 ? (
					<p className="next">
						Now the{' '}
						<mark>
							{this.state.whoNext} {this.state.whoNext == 'Cross' ? <span>'es</span> : null}
						</mark>
						{' '}move
					</p>
				) : null}

				<div className="winner">
					{
						renderResult()
					}
				</div>
				
				{this.state.current >= 1 ? (
					<a href="/" className="restart" onClick={this.restart}>
						Restart
					</a>
				) : null}
			</div>
		);
	}
}

export default App;
