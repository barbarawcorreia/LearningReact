import React, { Component } from  'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyDAMlUwzU2AaJ6Hjl12uK2OrT_0-K_Udz8';

YTSearch({key: API_KEY,term: 'surfboards'}, function(data) {
    console.log(data);
});


// Create a new component. This component should produce some HTML
class App extends Component { //Instance of App

    constructor(props)
    {
        super(props);

        this.state = { videos:[] }; // Initial State of Array of Videos

        YTSearch({key: API_KEY,term: 'surfboards'}, (videos) => {
            this.setState({ videos: videos}); // State after search videos
        });

    }
    render() {
        return (
         <div>
            <SearchBar />
            <VideoDetail video={this.state.videos[0]} />
            <VideoList videos={this.state.videos} />
        </div>
        );
    }
}

// Take this components generate HTML and put it on the page (in the DOM-html)

ReactDOM.render(<App />, document.querySelector('.container'));