
import React, { useRef } from "react";
import './help.css'

export default function Create({ setshowhelp }) {

    const modalRef = useRef()
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setshowhelp()
        }
    };

    return (
        <div className='modalBackground' onClick={closeModal} ref={modalRef}>
            <div className='modalContainer'>
              
                <p className="title">Instruction</p>
                
                <p className="sub">Create Mindmap</p>
                <li>กดคลิกขวาที่หัวข้อที่ต้องการเพื่อเพิ่มข้อมูล แก้ไข หรือ ลบข้อมูล</li>
                <br/>

                <p className="sub">Import Mindmap</p>
                <li>เลือกไฟล์ json ที่ต้องการนำเข้ามาแสดงเป็น Mindmap</li>
                <br/>

                <p className="sub">Export Mindmap</p>
                <li>เลือกประเภทไฟล์ ที่ต้องการดาวน์โหลด</li>
                <li>หากเลือกดาวน์โหลดสไลด์ คุณสามารถเลือกหัวข้อหลักที่ต้องการเพิ่มเข้าไปในสไลด์ได้</li>
                <br/>

                <p className="sub">Design Mindmap</p>
                <li>Theme คุณสามารถเลือดธีมสำเร็จรูปที่มีให้ เพื่อแสดงใน Mindmap ได้</li>
                <li>Layout คุณสามารถเลือกรูปแบบของ Mindmap ได้</li>
                <li>Style ปุ่มมุมบนขวาของ Mindmap ทำให้คุณสามารถออกแบบ Mindmap ได้อย่างอิสระ</li>
                <br/>

                <p className="sub">Presentation Mindmap</p>
                <li>คุณสามารถดู Preview ของ Mindmap ทั้งหมดได้ในรูปแบบสไลด์</li>
                <br/>

               
            </div>
        </div>

    );
}