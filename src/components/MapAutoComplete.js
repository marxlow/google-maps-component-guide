import React, { Component } from 'react';
import { AutoComplete } from 'antd';

class MapAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionts: [],
      dataSource: [],
      singaporeLatLng: this.props.singaporeLatLng,
      autoCompleteService: this.props.autoCompleteService,
      geoCoderService: this.props.geoCoderService,
    }
  }

  // Runs after clicking away from the input field or pressing 'enter'.
  // Geocode the location selected to be created as a marker.
  onSelect = ((value) => {
    this.state.geoCoderService.geocode({ address: value }, ((response) => {
      const { location } = response[0].geometry;
      this.props.addMarker(location.lat(), location.lng(), this.props.markerName);
    }))
  });


  // Runs a search on the current value as the user types in the AutoComplete field.
  handleSearch = ((value) => {
    const { autoCompleteService, singaporeLatLng } = this.state;
    // Search only if there is a string
    if (value.length > 0) {
      const searchQuery = {
        input: value,
        location: singaporeLatLng, // Search in Singapore
        radius: 30000, // With a 30km radius
      };
      autoCompleteService.getQueryPredictions(searchQuery, ((response) => {
        // The name of each GoogleMaps suggestion object is in the "description" field
        if (response) {
          const dataSource = response.map((resp) => resp.description);
          this.setState({ dataSource, suggestions: response });
        }
      }));
    }
  });

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        className="w-100"
        dataSource={dataSource}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="Address"
      />
    );
  }
}

export default MapAutoComplete;