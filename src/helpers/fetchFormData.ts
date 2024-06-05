import axios from 'axios';

export interface gdpr {
    id:number
    code:number
    name:string
}

export interface owasp {
    id:number
    code:string
    name:string
}

export interface weakness {
    id:number
    code:string
    name:string
}

export interface strategy {
    id:number
    name:string
}

export interface principle {
    id:number
    name:string
}

export interface iso {
    id:number
    code:string
    name:string
}

export interface pattern {
    id:number
    name:string
}

export function fetchGdpr() : Promise<gdpr[]>{
    return new Promise<gdpr[]> ((resolve,reject) => {
        axios.get('http://localhost:1337/api/gdprs')
        .then((response) => {
            if(response.status == 200){
                resolve(response.data.data.map(
                    (art:any) => ({id:art.id,name:art.attributes.name,code:art.attributes.code})
                ))
            }else{
                reject("Request not successful " + response.status)
            }
        }).catch(reject)
    });
}

export function fetchOwasp() : Promise<owasp[]>{
    return new Promise<owasp[]> ((resolve,reject) => {
        axios.get('http://localhost:1337/api/owasps')
        .then((response) => {
            if(response.status == 200){
                resolve(response.data.data.map(
                    (owasp:any) => ({id:owasp.id,name:owasp.attributes.name,code:owasp.attributes.code})
                ))
            }else{
                reject("Request not successful " + response.status)
            }
        }).catch(reject)
    });
}

export function fetchWeakness() : Promise<weakness[]>{
    return new Promise<weakness[]> ((resolve,reject) => {
        axios.get('http://localhost:1337/api/weaknesses')
        .then((response) => {
            if(response.status == 200){
                resolve(response.data.data.map(
                    (weak:any) => ({id:weak.id,name:weak.attributes.name,code:weak.attributes.code})
                ))
            }else{
                reject("Request not successful " + response.status)
            }
        }).catch(reject)
    });
}

export function fetchStrategyShort() : Promise<strategy[]>{
    return new Promise<strategy[]> ((resolve,reject) => {
        axios.get('http://localhost:1337/api/strategies?fields[0]=id&fields[1]=name')
        .then((response) => {
            if(response.status == 200){
                resolve(response.data.data.map(
                    (str:any) => ({id:str.id,name:str.attributes.name})
                ))
            }else{
                reject("Request not successful " + response.status)
            }
        }).catch(reject)
    });
}

export function fetchPrinciple() : Promise<principle[]>{
    return new Promise<principle[]> ((resolve,reject) => {
        axios.get('http://localhost:1337/api/principles')
        .then((response) => {
            if(response.status == 200){
                resolve(response.data.data.map(
                    (pr:any) => ({id:pr.id,name:pr.attributes.name})
                ))
            }else{
                reject("Request not successful " + response.status)
            }
        }).catch(reject)
    });
}

export function fetchIso() : Promise<iso[]>{
    return new Promise<iso[]> ((resolve,reject) => {
        axios.get('http://localhost:1337/api/isos')
        .then((response) => {
            if(response.status == 200){
                resolve(response.data.data.map(
                    (iso:any) => ({id:iso.id,name:iso.attributes.name,code:iso.attributes.code})
                ))
            }else{
                reject("Request not successful " + response.status)
            }
        }).catch(reject)
    });
}

export function fetchPatternShort() : Promise<pattern[]>{
    return new Promise<pattern[]> ((resolve,reject) => {
        axios.get('http://localhost:1337/api/patterns?fields[0]=id&fields[1]=name')
        .then((response) => {
            if(response.status == 200){
                resolve(response.data.data.map(
                    (pt:any) => ({id:pt.id,name:pt.attributes.name})
                ))
            }else{
                reject("Request not successful " + response.status)
            }
        }).catch(reject)
    });
}