/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';
/**
 *  import Request from 'xx/xx/Request';
 *
 * @param Get请求
 *  Request.get(url,(data)=>{
 *      console.log(data);
 *  },(error)=>{
 *      console.log(error);
 *  })
 *
 * @param Post请求
 *  let body = {
 *      xxx: xxx,
 *  }
 *  Request.post(url,body,(data)=>{
 *      console.log(data);
 *  },(error)=>{
 *      console.log(error);
 *  })
 *
 * @param 上传
 *  let body = [{
 *      name:'token',data:token,
 *  }, {
 *      name:'key', data:key,
 *  },{
 *      name: 'file',
 *      filename: key || 'file',
 *      data: RNFetchBlob.wrap(PATH)
 *  }];
 *  Request.upload(url,body,(perent)=>{
 *      // 进度条
 *      console.log(perent);
 *  },(data)=>{
 *      console.log(data);
 *  },(error)=>{
 *      console.log(error);
 *  })
 *
 * @param 取消网络请求
 *  let *Request = Request.get(url,(data)=>{
 *      console.log(data);
 *  })
 *
 *  // 取消某个网络请求
 *  Request.cancel();
 *
 * */

const Request = {
    // 框架可以用过cancel 取消某个网络请求
    /**
     * 设置Header请求头
     */
    Header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    /**
     * Config参数
     */
    GetConfig:{
        // 指示器,iOS专属
        indicator:true,
        // 超时
        // timeout:15000
        // 缓存
        // fileCache : bool,
        // 缓存地址
        // path : string,
        // appendExt : string,
        // session : string,
        // addAndroidDownloads : any,
    },
    PostConfig:{
        indicator:true
    },
    UpLoadConfig:{
        indicator:true
    },
    /**
     * @param url               请求网址
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns
     */
    get:(url, successCallBack, failCallBack) =>{
        console.log(url);
        return RNFetchBlob
            .config(Request.PostConfig)
            .fetch('GET',url,Request.Header)
            .then((response) => {
                if (response.respInfo.status === 200){
                    return response.json();
                }else {
                    return failCallBack(response);
                }
            })
            .then((response)=>{
                console.log(response);
                successCallBack(response);
            })
            .catch((error)=>{
            console.log(error);
                failCallBack(error);
            })
    },
    /**
     * @param url               请求网址
     * @param body              要上传的参数
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns {Promise.<U>|Promise.<T>}
     */
    post:(url, body, successCallBack, failCallBack) =>{

        Request.Header.body = JSON.stringify(body);
        console.log(Request.Header);

        // let header = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(body)
        // };
        //
        // console.log(header);
        // return fetch(url,header)
        //     .then((response) => response.json())
        //     .then((response)=>{
        //         console.log(response);
        //         successCallBack(response);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //         failCallBack(error);
        //     })

        return RNFetchBlob
            .config(Request.PostConfig)
            .fetch('POST',url,Request.Header)
            .then((response) => {
                if (response.respInfo.status === 200){
                    return response.json();
                }else {
                    return failCallBack(response);
                }
            })
            .then((response)=>{
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            })
    },
    /**
     * @param url               请求网址
     * @param body              要上传的信息,会自动转码
     * @param uploadProgress    上传进度
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns
     */
    upload:(url,body,uploadProgress,successCallBack,failCallBack) => {
        return RNFetchBlob
            .config(Request.UpLoadConfig)
            .fetch('POST',url,{
            'Content-Type' : 'multipart/form-data',
        },body)
            .uploadProgress((written, total) => {
            })
            .progress((received, total) => {
                let perent = received / total;
                // 搜索进度打印
                console.log(perent);
                uploadProgress(perent);
            })
            .then((response)=>{
                if (response.respInfo.status === 200){
                    return response.json();
                }else {
                    return failCallBack(response);
                }
            })
            .then((response)=> {
                // console.log(response);
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            });
    }
};

module.exports = Request;
