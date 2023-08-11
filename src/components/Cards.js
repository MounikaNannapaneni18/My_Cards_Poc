import React, {useState, useRef, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import './Cards.css';

const Cards = ({ card, isActive }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [cardContent, setCardContent] = useState({ ...card })
    const cardContentRef = useRef(null)
    const cardRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (cardContentRef.current && !cardContentRef.current.contains(event.target)) {
            setIsEditing(false);
          }
        };
    
        if (isEditing) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    const handleOnClick = () => {
        setIsEditing(true)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardContent((prevCard) => ({ ...prevCard, [name]: value }));
    };

    useEffect(() => {
        if (isActive && cardRef.current) {
          cardRef.current.scrollIntoView({
            behavior: "smooth",
            inline: "center",
          });
        }
      }, [isActive]);    

    return (
        <>
            <Card  className={`cardStyle ${isActive ? "active" : "disabled"}`} ref={cardRef}>
                <CardContent onClick={handleOnClick} ref={cardContentRef}>
                    <div className='header'>
                        {isEditing ?
                            <input type='text' name='heading' className='header' value={cardContent?.heading} onChange={handleInputChange} />
                            :
                            cardContent?.heading
                        }
                        </div>
                    <div className='subHeader'>
                        {isEditing ?
                            <input type='text' name='subHeading' className='subHeader' value={cardContent?.subHeading} onChange={handleInputChange} />
                            :
                            cardContent?.subHeading
                        }
                    </div>
                    <div className='content'>
                        {isEditing ?
                            <input type='text' name='content' className='content' value={cardContent?.content} onChange={handleInputChange} />
                            :
                            cardContent?.content
                        }
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default Cards;