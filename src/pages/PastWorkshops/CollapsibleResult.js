import React, { useState, useRef } from 'react';
import { Fragment } from 'react';

import "./CollapsibleResult.scss";

const CollapsibleResult = ({title, items, group}) => {
  const [collapsed, setCollapsed] = useState(true);
  const collapsedEl = useRef(null);

  const toggleCollapsed = () => { 
    setCollapsed(!collapsed)
    if (collapsed) {
      collapsedEl.current.style.maxHeight = `${collapsedEl.current.scrollHeight}px`;
    } else {
      collapsedEl.current.style.maxHeight = null
    }
  }

  const [activeGroup, setActiveGroup] = useState(0);
  const groups = [
    {
      assessment_category: 'Do Now',
      subtext: '(High Impact, Low Effort)'
    },
    {
      assessment_category: 'Make a Project',
      subtext: '(High Impact, High Effort)'
    },
    {
      assessment_category: 'Make a Task',
      subtext: '(Low Impact, Low Effort)'
    },
    {
      assessment_category: 'Forget for Now',
      subtext: '(Low Impact, High Effort)'
    }
  ]

  const isActive = (group) => groups.indexOf(group) === activeGroup;
  let activeItems = items.filter((item) => item.assessment_category === groups[activeGroup].assessment_category)
  
  const onSelectGroup = (group) => {
    setActiveGroup(groups.indexOf(group))
    setTimeout(() => {
      collapsedEl.current.style.maxHeight = `${collapsedEl.current.scrollHeight}px`;
    }, 0)
  }

  return (
    <div className="collapsible-result mb-2">
      <h5 className={group ? 'mb-2': ''}>
        <span onClick={toggleCollapsed}>{title}</span>
        <i className={`fa fa-angle-up ${collapsed ? 'collapsed' : ''}`}></i>
      </h5>
      <div ref={collapsedEl} className={ `collapsible-result-items ${collapsed ? '' : 'show'}`}>
        { group ?
          <Fragment>
            <div className={"assessment-categories"}>
              { groups.map((group) => <div onClick={onSelectGroup.bind(this, group)} className={`assessment-category ${isActive(group) ? 'active' : ''}`} key={group.assessment_category}> 
                <span className={'assessment-category-label'}>{group.assessment_category}</span>
                <span className={'assessment-category-subtext'}>{group.subtext}</span>
              </div>)}
            </div>
            {activeItems.map((item) =>
              <Fragment>
                <div className="collapsible-result-item" key={`result-item-${item.id}`}>{item.response_text}</div>
                <span className="separator" key={`result-separator-${item.id}`}></span>
              </Fragment>
            )}
          </Fragment> : 
          items.map((item) =>
            <Fragment>
              <div className="collapsible-result-item" key={`result-item-${item.id}`}>{item.response_text}</div>
              <span className="separator" key={`result-separator-${item.id}`}></span>
            </Fragment>
          )
        }
      </div>
    </div>
  );
}

export default CollapsibleResult;