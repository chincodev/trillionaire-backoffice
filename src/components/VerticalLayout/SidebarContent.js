import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter, useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { trait_typeService } from "services"

const SidebarContent = props => {
  const ref = useRef()
  const history = useHistory()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname
   
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByClassName("link")
      for (let i = 0; i < items.length; ++i) {

        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }


  const [ showMenu, setShowMenu ] = useState(true)

  const rel = () => {
    setShowMenu(false)
    setTimeout(() => {
      setShowMenu(true)
    }, 100);
  }
  

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="link">
                <i className="bx bx-home-circle"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/trait_types" className="link">
                <i className="bx bx-money"></i>
                <span>Trait types</span>
              </Link>
            </li>
            
            <li className="menu-title">{props.t("MAIN ATTRIBUTES")}</li>

            {/* <li>
              <Link to="/attributes" className=" ">
                <i className="bx bx-money"></i>
                <span>Attributes</span>
              </Link>
            </li> */}
            

            <li>
              <Link to="/colors" className="link">
                <i className="bx bxs-package"></i>
                <span>Skin colors</span>
              </Link>
            </li>
            <li>
              <Link to="/hair_coolors" className="link">
                <i className="bx bxs-package"></i>
                <span>Hair colors</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("NORMAL ATTRIBUTES")}</li>
            {
              showMenu && 
                sessionStorage.getItem('menu') && JSON.parse(sessionStorage.getItem('menu')) && JSON.parse(sessionStorage.getItem('menu')).length > 0 && JSON.parse(sessionStorage.getItem('menu')).map(x => <li>
                  <Link onClick={()=>rel()} to={`/attributes/${x._id}`} className="link">
                    <i className="bx bxs-package"></i>
                    <span style={{textTransform:'capitalize'}}>{x.name.toLowerCase()} {x.totalChance}/10k</span>
                  </Link>
                </li>)
              
            }
            {/* <li style={{padding:'12px 20px'}} className="d-flex justify-content-center">
           
           <button className="btn btn-primary btn-block w-100"> ADD ATTRIBUTE</button>
        
         </li> */}
         
            {/* <li className="menu-title">System</li>
            <li>
              <Link to="/users" className="">
                <i className="bx bxs-user-detail"></i>
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/roles" className="">
                <i className="bx bxs-user-detail"></i>
                <span>Roles</span>
              </Link>
            </li> */}
          </ul>
          
        </div>
        {/* <hr/> */}
        
        
       
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
