import React,{Component} from 'react'

import classes from './Test2.scss'


export class  Test2 extends Component
{



  constructor() {

    super();
    this.state = {
      myName: "lx",
      myName1: "lx",
      myName2: "lx",
    };

    this.timer = setTimeout(


      () => {   this.props.testa("sdsdfdf"); this.setState({      myName: "lx22222211332334",}) },
      5000
    );

  }




  componentDidMount()
  {







   // console.log(this.props.testa)



   //   this.props
  }



  render()
  {
    return(
      <div>
       Loading

      </div>
    )
  }
}

Test2.propTypes = {
}

export default Test2
