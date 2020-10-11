import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Point from "../interfaces/point";
import GeoLocation from "../interfaces/geoLocation";

@Entity()
class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column({
        type: "geometry",
        nullable: false,
        spatialFeatureType: "Point",
        srid: 4326,
        transformer: {
            to(value: Point): Point {
                return value;
            },
            from(value: GeoLocation): Point {
                 return {lat: value.coordinates[1], lon: value.coordinates[0]};
            }
        }
    })
    geom: Point;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;
}

export default Airport;
