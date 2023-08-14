const Sidebar = (props:any) => {
    return (<>
              <aside className="sidebar">
              <ul>
                {
                props?.settings?
                (<>
                <li className='context-chapter'><span>Settings</span></li>
                <hr></hr>
                <li className='context-menuitem'><a href="/settings/sshkeys">SSH Keys</a></li>
                <li className='context-menuitem'><a href="/settings/profile">Profile</a></li>
                <hr className="divider"></hr>
                </>
                ):<></>

              }
              {
                props?.repository?
                (<>
                <li className='context-chapter'><span>{props?.repository.name}</span></li>
                 <hr></hr>
                <li className='context-menuitem'><a href={`/${props?.repository.project}/${props?.repository.name}/clone`}>Clone</a></li>
                <li className='context-menuitem'><a href={`/${props?.repository.project}/${props?.repository.name}/branches`}>Branches</a></li>
                <li className='context-menuitem'><a href={`/${props?.repository.project}/${props?.repository.name}/files`}>Files</a></li>
                <li className='context-menuitem'><a href={`/${props?.repository.project}/${props?.repository.name}/commits`}>Commits</a></li>
                <hr className="divider"></hr>
                </>
                ):<></>
            }
              </ul>

              <button>Close Sidebar</button>
            </aside>
        </>)
};

export default Sidebar;