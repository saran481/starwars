export interface detailsInterFace {
    name : string,
    eye_color: string,
    gender: string,
    hair_color: string,
    homePlanet: string,
    homeworld: string,
    films: string[],
} 

export interface flimsInterface{
    title: string
}



export interface CallbackType { (details: detailsInterFace): void }