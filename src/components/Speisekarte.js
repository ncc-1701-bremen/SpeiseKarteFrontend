import React, { Component } from 'react';
import Page from './Page';
import Editor from './Editor';

class Speisekarte extends Component {
  constructor() {
    super();
    this.state = {
        index: 0,
        swiperPos: 0,
        movement: 0,
        selectedComponent: false
    }

    this.activateDrag = false;
    this.moveStopTimer = undefined;
    this.dragStartPos = 0;
    this.moveThreshold = 10;
    this.componentDrag = false;
  }

  // On the swipe end the position is anchored accordingly to the index
  moveEnde = () => {
    if(!this.activateDrag) {
      const realPos = this.timerMovement;
      const viewPort = this.viewPort;
      this.swipeEndAnimation = null;
      let newIndex = this.state.index;

      // Set the new index according to the relative movement
      if(Math.abs(realPos) > viewPort/3) {
          if(realPos > viewPort/3) {
              newIndex--;
          } else if(realPos < viewPort/3) {
              newIndex++;
          }
      }

      // Check if the index fits the corresponding pages array
      if(newIndex < 0) {
          newIndex = 0;
      } else if (newIndex > this.props.data.pages.length-1) {
          newIndex = this.props.data.pages.length-1;
      }

      this.activateDrag = false
      this.setState({
          index: newIndex,
          swiperPos: -viewPort * newIndex
      })
    } else {
      this.swipeEndAnimation = requestAnimationFrame(this.moveEnde);
    }
  }

  checkDrag = () => {
    this.activateDrag = false;
  }

  // Handels swiper movement relative to starting position
  move = (evt) => {
    if(this.activateDrag && !this.componentDrag) {
        const movement = evt.changedTouches ? evt.changedTouches[0].clientX : evt.clientX;
        const verticalMovement = evt.changedTouches ? evt.changedTouches[0].clientY : evt.clientY;
        const viewPort = Math.max(document.documentElement.clientWidth, window.innerWidth) || 0;
        const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;

        // This timeout will control the page adjustment on movement stop. It will be continuously cancelled until the movement stops
        clearTimeout(this.moveStopTimer);
        const timerMovement = movement-this.dragStartPos; // Pre calculated movement value to compare the relative movement
        this.moveStopTimer = setTimeout(this.checkDrag, 500);
        this.timerMovement = timerMovement;
        this.viewPort = viewPort;
        if(!this.swipeEndAnimation) {
          this.swipeEndAnimation = requestAnimationFrame(this.moveEnde);
        }


        this.setState({
            movement: movement - this.dragStartPos
        })

        // Cancel movement is cursor leaves screen
        if(movement <= this.moveThreshold || verticalMovement <= this.moveThreshold ||
           movement >= viewPort - this.moveThreshold || verticalMovement >= viewPortHeight - this.moveThreshold) {
           this.activateDrag = false;
        }
    } else {
      this.activateDrag = false;
    }
  }

  setComponentDrag = (state) => {
      this.componentDrag = state;
  }

  // Binds the mousemove event and sets the starting position
  lockToggle = (lockStatus, evt) => {
      this.activateDrag = lockStatus;
      this.dragStartPos = evt.changedTouches ? evt.changedTouches[0].clientX : evt.clientX;
  }

  selectComponent = (component, page) => {
    this.setState({
      selectedComponent: {
        component: component,
        page: page
      }
    })
  }

  deselectComponent = (deleted = false) => {
    let stateObject = {
      selectedComponent: false
    }

    // If a page is deleted, change the swiper position
    if(deleted) {
      stateObject.index = this.state.index-1;
      stateObject.swiperPos = this.state.swiperPos/this.state.index*stateObject.index;
    }

    this.setState(stateObject);
  }

  render() {
    let swiperPos = this.state.swiperPos + this.state.movement * Number(this.activateDrag);
    if(this.props.editingMode) {
        swiperPos = swiperPos/100*80
    }
    return (
      <div className="karte-wrapper">
          <div className="pages">
              {
                  this.props.data.pages.map(page => {
                      return(
                          <Page key={page} pageData={this.props.data.pageInfos[page]} editingMode={this.props.editingMode}
                                page={page} genFunctions={this.props.genFunctions} swiperPos={swiperPos}
                                onMove={this.move} onDragStart={this.lockToggle} setComponentDrag={this.setComponentDrag}
                                selectComponent={this.selectComponent}/>
                      )
                  })
              }
          </div>
          {this.props.editingMode && <Editor genFunctions={this.props.genFunctions}
                                             setComponentDrag={this.setComponentDrag}
                                             selectedComponent={this.state.selectedComponent}
                                             setComponentData={this.props.setComponentData}
                                             deselectComponent={this.deselectComponent}
                                             genFunctions={this.props.genFunctions}
                                             saveData={this.props.saveData}
                                             componentData={this.state.selectedComponent &&  this.props.data.pageInfos[this.state.selectedComponent.page].componentInfos[this.state.selectedComponent.component]}/>}
      </div>
    )
  }
}

export default Speisekarte;
