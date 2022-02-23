import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { avatarService } from 'services'
import { useDebounce } from 'use-debounce';

const AvatarShowModal = (props) => {

	const [ item, setItem ] = useState({})
	const [ scopedId, setScopedId ] = useState(1)
	const [ actionsLoading, setActionsLoading ] = useState(false)
	// const [ debouncedScopedId ] = useDebounce(scopedId, 1000);

	const getItem = async (id) => {

		try {

			setActionsLoading(true)
			let res = await avatarService.find(id)
			setItem(res)
			setActionsLoading(false)

		} catch (er) {
			console.log(er)
		}

	}

	useEffect(() => {
		getItem(scopedId)
	}, [scopedId])


    return (
        <Modal
            isOpen={props.avatarShowModal}
            role="dialog"
        	autoFocus={true}
        	size='lg'
        	centered
        	data-toggle="modal"
            toggle={() => {
                props.setAvatarShowModal(!props.avatarShowModal)
            }}
        >
            <div className="modal-content">
                <ModalHeader
                    toggle={() => {
                        props.setAvatarShowModal(!props.avatarShowModal)
                    }}
                >
                    Avatar's List: {!_.isEmpty(item) && item.data ? item.data.name : ''}
                </ModalHeader>

                <ModalBody>
                  {
                     (!_.isEmpty(item.data)) ? (
                      <>
                         <div className="d-flex">
                    <div style={{width:'60%'}}>
                     <img id='avatar' src={item.data.image} style={{width:'100%', paddingRight:'20px', paddingTop:'10px'}}></img>


                    </div >
                    <div style={{width:'40%'}}>
                      <div>
                        <p><strong>COLOR: </strong>{item.data.color.value}</p>
                      </div>
                      <div>
                        <p><strong>HAIR COLOR: </strong>{item.data.hair_color.value}</p>
                      </div>
                      {
                        item.data.attributes.map(x => <div>
                          <p><strong>{x.trait_type.name}: </strong>{x.value}</p>
                        </div>)
                      }

                      </div>
                      </div>
                      </>
					  ) : (_.isEmpty(item.data) && !actionsLoading) ? 'Item does not exist' : (_.isEmpty(item.data) && actionsLoading) && 'Loading...'
                  }

              </ModalBody>
              <ModalFooter>
                {
					!_.isEmpty(item) && <>
					<Button
                  type="button"
                  color="primary"
				  disabled={actionsLoading ? true : item.prev.length > 0 ? false : true}
                  onClick={() => {
                    setScopedId(item.prev[0]['id'])
                  }}
                >
                  Back
                </Button>
				{
					item.prev.map(x => <Button
						type="button"
						color="primary"
						onClick={() => {
						  setScopedId(x.id)
						}}
						disabled={actionsLoading}
					  >
						{x.id}
					  </Button>)
				}
                {/* <Button
                  type="button"
                  color="dark"
                  disabled={true}
                >
                  {item.data.id}
                </Button> */}
				<input style={{width:'100px'}} type='number'  value={scopedId} onChange={(e)=>setScopedId(e.target.value)} className='form-control' min='0'></input>
				{
					item.next.map(x => <Button
						type="button"
						color="primary"
						disabled={actionsLoading}
						onClick={() => {
						  setScopedId(x.id)
						}}
					  >
						{x.id}
					  </Button>)
				}
                <Button
                  disabled={actionsLoading ? true : item.next.length > 0 ? false : true}
                  type="button"
                  color="primary"
                  onClick={() => {
                    setScopedId(item.next[0]['id'])
                  }}
                >
                  Next

                </Button></>
				}
              </ModalFooter>


            </div>
          </Modal>
    )
}


export default AvatarShowModal;