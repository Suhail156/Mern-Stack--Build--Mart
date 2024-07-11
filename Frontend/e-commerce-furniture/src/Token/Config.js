  const token=localStorage.getItem('token')
  const refreshToken=localStorage.getItem('refresh_token')
  const adminToken=localStorage.getItem('adminToken')    
export const userConfig={

    headers:{
        'Content-Type':'application/json',
        Authorization:token,
        refresh_token:refreshToken
    }
}
export const adminConfig={
    headers:{
        'Content-Type':"application/json",
        Authorization:adminToken,
    }
}