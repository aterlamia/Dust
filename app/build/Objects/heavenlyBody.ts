export interface HeavenlyBody {
    getMass(): number;
    getVelocity(): {forceX: number; forceY: number} ;
    getX(): number;
    getY(): number;
}