import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaLaptop, FaSchool } from 'react-icons/fa';
import { ClassCard } from './components/card';

import { address as serverAddress } from './config/server';
import './styles/main.scss'
import { IClassDay } from './types';

const App: React.FC = () => {
    const [groups, setGroups] = useState({
        c: 1,
        l: 1
    })
    const [classDays, setClassDays] = useState<Array<IClassDay>>([]);

    useEffect(() => {
        axios.get(`${serverAddress}/lessons`)
            .then(res => {
                if (res.status === 200) {
                    setClassDays(res.data);
                }
            })
    }, [])

    const updateGroups = (key: "c" | "l", val: number) => {
        setGroups({ ...groups, [key]: val })
    }

    return (
        <div className="row row-hcenter">
            <div className="col-12 mt-1 pl-1 pr-1 mb-3">
                <div className="card card-bg_1">
                    <div className="row row-hcenter row-vcenter">
                        <div className="col-12 mb-2">
                            <h1 className="h3 color-light_1 weight-bold align-center">Wybierz swoje grupy</h1>
                        </div>

                        <div className="col-auto mr-2">
                            <label htmlFor="cwiczenia" className="color-light_1 size-xl">Ćwiczeniowa: </label>
                            <select className="select size-xl" id="cwiczenia" onChange={(e) => updateGroups("c", parseInt(e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="laboratoria" className="color-light_1 size-xl">Laboratoryjna: </label>
                            <select className="select size-xl" id="laboratoria" onChange={(e) => updateGroups("l", parseInt(e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 pl-1 pr-1">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="cell-m">
                                <p className="size-l weight-bold align-center">Dni</p>
                            </th>

                            <th>
                                <p className="size-l weight-bold align-center">8:00-10:30</p>
                            </th>

                            <th>
                                <p className="size-l weight-bold align-center">10:45-13:15</p>
                            </th>

                            <th>
                                <p className="size-l weight-bold align-center">14:00-16:30</p>
                            </th>

                            <th>
                                <p className="size-l weight-bold align-center">16:45-19:15</p>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {classDays.map(classDay => {
                            return (
                                <tr>
                                    <td className="color-light_1">
                                        {classDay.date}
                                    </td>

                                    <td>
                                        {classDay['8:00-10:30'].lessons.map(lesson => {
                                            return <ClassCard groups={groups} lesson={lesson} />
                                        })}
                                    </td>

                                    <td>
                                        {classDay['10:45-13:15'].lessons.map(lesson => {
                                            return <ClassCard groups={groups} lesson={lesson} />
                                        })}
                                    </td>

                                    <td>
                                        {classDay['14:00-16:30'].lessons.map(lesson => {
                                            return <ClassCard groups={groups} lesson={lesson} />
                                        })}
                                    </td>

                                    <td>
                                        {classDay['16:45-19:15'].lessons.map(lesson => {
                                            return <ClassCard groups={groups} lesson={lesson} />
                                        })}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
