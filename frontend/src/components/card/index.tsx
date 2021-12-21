import { FaLaptop, FaSchool } from 'react-icons/fa'
import { ICard, IClassCard } from './types';

const ClassCard: React.FC<IClassCard> = ({
    lesson,
    groups
}) => {
    const { name, groups: classGroups } = lesson;
    const isRemote = name.includes('ZDALNIE');
    let classType: "w" | "c" | "l" = "w";
    let cardColor: "2" | "3" | "4" = "2";
    let isInClassGroup = true;

    if (name.includes('ćwiczenia')) {
        classType = "c";
        cardColor = "3";
        isInClassGroup = classGroups.c === groups.c;
    } else if (name.includes('lab.')) {
        classType = "l";
        cardColor = "4";
        isInClassGroup = classGroups.l === groups.l;
    }

    return (
        <div>
            {isInClassGroup &&
                <Card cardColor={cardColor}>
                    <div className="card--header row row-vcenter">
                        <div className="col-auto">
                            <p className="size-xxl color-light_1 mr-1">
                                {isRemote ?
                                    <FaLaptop /> :
                                    <FaSchool />
                                }
                            </p>
                        </div>
                        <div className="col-auto">
                            <p className="size-l color-light_1">
                                {isRemote ? "Zdalnie" : "Stacjonarnie"}
                            </p>
                        </div>
                    </div>
                    <p className='size-l color-light_1'>
                        {name}
                    </p>
                </Card>
            }
        </div>
    )
}

const Card: React.FC<ICard> = ({
    cardColor,
    children
}) => {
    return (
        <div className={`card card-bg_${cardColor}`}>
            {children}
        </div>
    )
}

export {
    ClassCard,
    Card
}