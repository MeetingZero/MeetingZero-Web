import React, { useState, useRef, useEffect, Fragment } from 'react';
import "./CollapsibleResult.scss";
import { ASSESSMENT_CATEGORIES } from '../../constants/labels';

const CollapsibleResult = ({title, items, group}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeGroup, setActiveGroup] = useState(0);
  const collapsedEl = useRef(null);

  const isActive = (group) => ASSESSMENT_CATEGORIES.indexOf(group) === activeGroup;
  const activeItems = items.filter((item) => item.assessment_category === ASSESSMENT_CATEGORIES[activeGroup].assessment_category);
  
  useEffect(() => {
    if (collapsed) {
      collapsedEl.current.style.maxHeight = null;
    } else {
      collapsedEl.current.style.maxHeight = `${collapsedEl.current.scrollHeight}px`;
    }
  })

  return (
    <div className="collapsible-result mb-2">
      <h5 className={group ? 'mb-2': ''}>
        <span onClick={setCollapsed.bind(this, !collapsed)}>{title}</span>
        <i className={`fa fa-angle-up ${collapsed ? 'collapsed' : ''}`}></i>
      </h5>
      <div ref={collapsedEl} className={ `collapsible-result-items ${collapsed ? '' : 'show'}`}>
        { group ?
          <Fragment>
            <div className={"assessment-categories"}>
              { ASSESSMENT_CATEGORIES.map((group) => <div onClick={setActiveGroup.bind(this, ASSESSMENT_CATEGORIES.indexOf(group))} className={`assessment-category ${isActive(group) ? 'active' : ''}`} key={group.assessment_category}> 
                <span className={'assessment-category-label'}>{group.assessment_category}</span>
                <span className={'assessment-category-subtext'}>{group.subtext}</span>
              </div>)}
            </div>
            {activeItems.map((item) =>
              <Fragment key={`result-item-${item.id}`}>
                <div className="collapsible-result-item">{item.response_text}</div>
                <span className="separator"></span>
              </Fragment>
            )}
          </Fragment> : 
          items.map((item) =>
            <Fragment key={`result-item-${item.id}`}>
              <div className="collapsible-result-item">{item.response_text}</div>
              <span className="separator"></span>
            </Fragment>
          )
        }
      </div>
    </div>
  );
}

export default CollapsibleResult;
