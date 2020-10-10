import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class AirportRoute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    source: number;

    @Column()
    target: number;

    @Column({
        type: "geometry",
        nullable: true,
        spatialFeatureType: "LineString",
        srid: 4326
    })
    geom: string;

    @Column()
    distance: number;
}

export default AirportRoute;
