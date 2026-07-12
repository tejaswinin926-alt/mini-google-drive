import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api'


function MyFiles({ refreshTrigger }) {

  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')


  useEffect(() => {
    fetchFiles()
  }, [refreshTrigger])


  const fetchFiles = async () => {

    try {

      setLoading(true)
      setError('')

      const token = localStorage.getItem('token')


      const response = await fetch(
        `${API_URL}/files`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )


      const data = await response.json()


      if(!response.ok){
        throw new Error(
          data.error || 'Failed to fetch files'
        )
      }


      setFiles(data.files)


    } catch(err){

      setError(err.message)

    } finally {

      setLoading(false)

    }

  }



  const handleDownload = async(fileId, filename)=>{

    try{

      const token = localStorage.getItem('token')


      const response = await fetch(
        `${API_URL}/download/${fileId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )


      if(!response.ok){
        throw new Error('Download failed')
      }


      const blob = await response.blob()


      const url = window.URL.createObjectURL(blob)


      const link = document.createElement('a')

      link.href = url
      link.download = filename


      document.body.appendChild(link)

      link.click()


      link.remove()


      window.URL.revokeObjectURL(url)


    } catch(err){

      setError(err.message)

    }

  }





  const handleDelete = async(fileId)=>{


    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this file?'
      )


    if(!confirmDelete)
      return



    try{

      const token = localStorage.getItem('token')


      const response = await fetch(
        `${API_URL}/files/${fileId}`,
        {
          method:'DELETE',
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )


      if(!response.ok){
        throw new Error('Delete failed')
      }


      fetchFiles()


    }catch(err){

      setError(err.message)

    }

  }






  const getIcon = (filename)=>{

    const ext =
      filename
      .split('.')
      .pop()
      .toLowerCase()


    if(
      ['jpg','jpeg','png','gif','webp']
      .includes(ext)
    )
      return '🖼️'


    if(
      ['pdf','doc','docx','txt']
      .includes(ext)
    )
      return '📄'


    if(
      ['mp4','avi','mkv']
      .includes(ext)
    )
      return '🎬'


    return '📁'

  }







  const filteredFiles = files.filter(file =>

    file.filename
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )

  )







  if(loading){

    return(
      <div style={styles.loading}>
        Loading files...
      </div>
    )

  }







  return(

    <div style={styles.container}>


      <div style={styles.top}>

        <h2 style={styles.title}>
          My Files 📂
        </h2>


        <input

          type="text"

          placeholder="Search files..."

          value={search}

          onChange={
            e=>setSearch(e.target.value)
          }

          style={styles.search}

        />

      </div>





      {
        error &&

        <div style={styles.error}>
          {error}
        </div>

      }






      {
        filteredFiles.length === 0

        ?

        <div style={styles.empty}>
          No files found
        </div>


        :


        <div style={styles.grid}>


          {
            filteredFiles.map(file => (


              <div
                key={file.id}
                style={styles.card}
              >


                <div style={styles.icon}>
                  {getIcon(file.filename)}
                </div>



                <div style={styles.name}>
                  {file.filename}
                </div>



                <div style={styles.date}>
                  {
                    new Date(
                      file.upload_date
                    )
                    .toLocaleDateString()
                  }
                </div>




                <div style={styles.actions}>


                  <button
                    style={styles.download}
                    onClick={() =>
                      handleDownload(
                        file.id,
                        file.filename
                      )
                    }
                  >
                    Download
                  </button>



                  <button
                    style={styles.delete}
                    onClick={() =>
                      handleDelete(file.id)
                    }
                  >
                    Delete
                  </button>


                </div>


              </div>


            ))

          }


        </div>


      }


    </div>

  )

}






const styles = {


container:{
  background:'#ffffff',
  padding:'18px',
  borderRadius:'14px',
  boxShadow:'0 3px 10px rgba(0,0,0,0.05)'
},


top:{
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:'15px'
},


title:{
  margin:0,
  color:'#222',
  fontSize:'20px'
},


search:{
  width:'220px',
  padding:'8px 12px',
  border:'1px solid #ddd',
  borderRadius:'8px'
},


grid:{
  display:'grid',
  gridTemplateColumns:
  'repeat(auto-fill,minmax(220px,1fr))',
  gap:'15px'
},


card:{
  background:'#f8fafc',
  padding:'15px',
  borderRadius:'12px',
  border:'1px solid #e5e7eb'
},


icon:{
  fontSize:'32px'
},


name:{
  marginTop:'10px',
  fontWeight:'600',
  wordBreak:'break-word',
  color:'#333'
},


date:{
  marginTop:'8px',
  fontSize:'13px',
  color:'#666'
},


actions:{
  display:'flex',
  gap:'8px',
  marginTop:'12px'
},


download:{
  flex:1,
  background:'#22c55e',
  color:'#fff',
  border:'none',
  padding:'8px',
  borderRadius:'7px',
  cursor:'pointer'
},


delete:{
  flex:1,
  background:'#ef4444',
  color:'#fff',
  border:'none',
  padding:'8px',
  borderRadius:'7px',
  cursor:'pointer'
},


loading:{
  textAlign:'center',
  padding:'25px',
  color:'#666'
},


empty:{
  textAlign:'center',
  padding:'30px',
  color:'#666'
},


error:{
  background:'#fee2e2',
  color:'#991b1b',
  padding:'10px',
  borderRadius:'8px',
  marginBottom:'12px'
}


}


export default MyFiles