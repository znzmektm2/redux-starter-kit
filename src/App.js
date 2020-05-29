import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

class App extends Component {

	// loadData = () => {
	// 	const { PostActions, number } = this.props;
	// 	PostActions.getPost(number).then(
	// 		(response) => {
	// 			console.log(response);
	// 		}
	// 	).catch(
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// }

	cancelRequest = null;

	handleCancel = () => {
		if(this.cancelRequest) {
			this.cancelRequest();
			this.cancelRequest = null;
		}
	}

	loadData = async() => {
		const { PostActions, number } = this.props;
		try{
			const p = PostActions.getPost(number);
			this.cancelRequest = p.cancel;
			//const response = await PostActions.getPost(number);
			const response = await p;
			console.log(response);
		} catch(e) {
			console.log(e);
		}
	}

	componentDidMount(){
		console.log('componentDidMount');
		this.loadData();
		window.addEventListener('keyup', (e) => {
			if(e.key === 'Escape') {
				this.handleCancel();
			}
		})
	}

	componentDidUpdate(prevProps, prevState){
		// 이전 number와 현재 number가 다르면 요청을 시작합니다.
		console.log("componentDidUpdate "+this.props.number, prevProps.number)
		if(this.props.number !== prevProps.number) {
			this.loadData();
		}
	}

	render() {
		const { CounterActions, number, post, error, loading } = this.props;
		
		return (
			<div>
				<h1>{number}</h1>
				{
					loading 
						? (<h2> 로딩중...</h2>)
						: (
							error 
								? (<h2>오류 발생!</h2>)
								: (
									<div>
										<h2>{post.title}</h2>
										<p>{post.data}</p>
									</div>
								)
						)
				}
				<button onClick={CounterActions.increment}>+</button>
				<button onClick={CounterActions.decrement}>-</button>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		number: state.counter,
		post: state.post.data,
		loading: state.pender.pending['GET_POST'],
		error: state.pender.failure['GET_POST']
	}),
	(dispatch) => ({
		CounterActions: bindActionCreators(counterActions, dispatch),
		PostActions: bindActionCreators(postActions, dispatch)
	})
)(App);