import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class AirportRoute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    source: number;

    @Column()
    @Index()
    target: number;

    @Column({
        type: "geometry",
        nullable: true,
        spatialFeatureType: "LineString",
        srid: 4326
    })
    @Index()
    geom: string;

    @Column()
    distance: number;
}

export default AirportRoute;
