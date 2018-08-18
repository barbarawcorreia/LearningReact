import _ from 'lodash';
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
        super(props); // Where this props came from ? react ?

        this.state = { videos:[], selectedVideo: null }; // Initial State of Array of Videos

        this.videoSearch('surfboards');
    }
    
    videoSearch(term) {
        YTSearch({key: API_KEY,term: term}, (videos) => {
            this.setState({ videos: videos, selectedVideo: videos[0]}); // State after search videos
        });
    }
    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        },300 )
        return (
         <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList  onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
        </div>
        );
    }
}

// Take this components generate HTML and put it on the page (in the DOM-html)

ReactDOM.render(<App />, document.querySelector('.container'));