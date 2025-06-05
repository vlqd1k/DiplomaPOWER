export const FlowerInfo = ({ title, image, description, alt }) => {
  return (
    <div style={{marginTop:"20px"}}>
      <div style={{float: "left",textAlign:"center",marginLeft:"50px",marginRight:"50px"}}>
        <img style={{height:"180px",width:"180px",borderRadius:"10px"}} src={image} alt={alt} />
        <p style={{fontWeight:"900", fontSize:"14px",paddingTop:"20px"}}>{title}</p>
      </div>
      
      
      <div
        
      >
                
                </div>
                <div>
                <div style={{height:"500px"}}>{description ? description : 'No description'}</div>
      </div>
    </div>
  );
};
