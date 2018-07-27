import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			body: '',
			posts: {},
		};

		// Set up this pointers in each user defined function
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
		this.postData = this.postData.bind(this);
	};

	// Take whatever content is in the state body and send it to the server
	handleSubmit (event) {
		event.preventDefault();
		this.postData();
		// event.currentTarget.reset();
		this.setState({
			body: '',
		})
	};

	// Send the state body to the server
	// Because this isn't called from jsx, it actually doesn't need to be bound to this
	postData() {
		axios.post('/posts', {
			body: this.state.body
		})
		.then( (response) => {
			const copyOfPosts = { ...this.state.posts };
			copyOfPosts[response['data']['id']] = response.data;
			this.setState({
				posts: copyOfPosts,
			});
		})
		.catch(function(error) {
			console.error(error);
		});
	}

	// Dynamically update the state body as it changes in the textarea
	handleBodyChange (event) {
		this.setState({
			body: event.target.value
		})
	}

	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card">
							<div className="card-header">Tweet something</div>

							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<textarea 
											onChange={this.handleBodyChange}
											value={this.state.body}
											className="form-control" 
											rows="5" 
											maxLength="140" 
											placeholder="What's up?" 
											required
										/>
									</div>
									<input 
										type="submit" 
										value="Post" 
										className="form-control"
									/>
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card">
							<div className="card-header">Recent tweets</div>

							<div className="card-body">
								{Object.keys(this.state.posts).map(postId => 
									<div key={postId} className="media">
										<div className="media-left">
											<img className="media-object mr-2" src={this.state.posts[postId].user.avatar}/>
										</div>
										<div className="media-body">
											<div className="user">
												<a href={`/users/${this.state.posts[postId].user.username}`}>
													<strong>{this.state.posts[postId].user.username}:</strong>
												</a>
											</div>
											<p>
												{this.state.posts[postId].body}
											</p>
										</div>
									</div>)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;