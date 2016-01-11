   var Terrain = React.createClass({
    
      getInitialState: function() {
        return {
          table: [["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","","",""]]
        };
      },
      
/*    componentDidMount: function() {
        var newtab = this.state.table;
        for (var i=0;i<15;i++) {
            var ligne = [];
            newtab.push(ligne);
            for (var j=0;j<15;j++) {
                newtab[i].push("");
            }
        }
        this.setState({table : newtab});
    },*/

      render: function() {
        var terrain=[];
        var columnLength = this.state.table.length;
        var lineLength = this.state.table[0].length;

        console.log(columnLength);
        console.log(lineLength);
        for (var i=0; i<columnLength; i++) {
          var ligne = []
          for (var j=0; j<lineLength; j++) {
              var block = <div className="case"></div>
              ligne.push(block);
          };
          terrain.push(<div>{ligne}</div>);
          };
      return <div className="terrain">{terrain}</div>;
      }
      })
