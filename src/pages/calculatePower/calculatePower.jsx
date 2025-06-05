
import { v4 as uuidv4 } from 'uuid';

import React, { useState, useEffect } from "react";

import { Modal, Button, Input, Select, Table, message, Pagination, Row, Col } from "antd";

import { getCalculations, addCalculation, deleteCalculation } from '../../firebase/firebase';

import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

import './calculatepower.css'



const recommendedDevices = {
  battery: ["Акумулятор 12V 100Ah", "Акумулятор 24V 200Ah"],
  generator: ["Генератор 2кВт бензиновий", "Генератор 5кВт дизельний"],
  ups: ["ДБЖ APC 1500VA", "ДБЖ CyberPower 2200VA"],
};

const HelpSection = () => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h3>Довідка:</h3>
    <p>Резервне живлення - це система, яка забезпечує електроенергію у разі зникнення основного живлення.</p>
    <p>Типи резервного живлення: акумулятори, генератори та ДБЖ.</p>
    <p>Правильний вибір залежить від потужності, тривалості автономної роботи та умов експлуатації.</p>
  </div>
);

export default function BackupWatt() {
  const [devices, setDevices] = useState([]);
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [time, setTime] = useState("");
  const [efficiency, setEfficiency] = useState("85");
  const [voltage, setVoltage] = useState("12");
  const [selectedType, setSelectedType] = useState("battery");
  const [errorMessage, setErrorMessage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    getCalculations().then(data => setDevices(data ?? []))
  }, [])

  const validateInputs = () => {
    if (!name || !power || !time || !efficiency) return "Заповніть усі поля.";
    if (isNaN(power) || power <= 0) return "Некоректна потужність.";
    if (isNaN(time) || time <= 0) return "Некоректний час роботи.";
    if (isNaN(efficiency) || efficiency < 1 || efficiency > 100) return "ККД має бути в межах 1-100%.";
    return null;
  };

  const addDevice = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const newDevice = {id: uuidv4(), name, power: Number(power), time: Number(time) }

    await addCalculation(newDevice)

    const updatedDevices = await getCalculations() ?? []

    setDevices(updatedDevices);


    setName("");
    setPower("");
    setTime("");
  };

  const removeDevice = async (id) => {
    await deleteCalculation(id);

    const updatedDevices = await getCalculations() ?? [];

    setDevices(updatedDevices);
  };
  const customFonts = {
    Roboto: {
      normal: '../../fonts/Roboto-Regular.ttf'
    },
  };

  const generateReport = (device) => {
    const docDefinition = {
      content: [
        { text: 'Звіт про резервне живлення', style: 'header' },
        { text: `Пристрій: ${device.name}`, style: 'subheader' },
        { text: `Потужність: ${device.power} Вт`, style: 'text' },
        { text: `Час роботи: ${device.time} год`, style: 'text' },
        { text: `ККД: ${efficiency}%`, style: 'text' },
        { text: `Тип пристрою: ${selectedType}`, style: 'text' },
        { text: 'Рекомендації', style: 'subheader' },
        {
          ul: [
            `Рекомендована ємність: ${(device.power * device.time / (efficiency / 100)).toFixed(2)} А·год`,
            `Максимальний струм: ${(device.power * device.time / (efficiency / 100) / voltage).toFixed(2)} A`,
            `Рекомендовані моделі: ${recommendedDevices[selectedType].join(', ')}`,
          ],
          style: 'text'
        }
      ],
      defaultStyle: {
        font: 'Roboto'  // Використовуємо кастомний шрифт
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        text: {
          fontSize: 12,
          margin: [0, 5, 0, 5]
        }
      }
    };
    
  
    // Download the PDF document
    pdfMake.createPdf(docDefinition).download(`${device.name}_звіт.pdf`);
  };
  
  

  const calculate = () => {
    if (devices.length === 0) {
      setErrorMessage("Додайте хоча б один пристрій.");
      return;
    }
    const totalEnergy = devices.reduce((sum, device) => sum + device.power * device.time, 0);
    const efficiencyFactor = Number(efficiency) / 100;
    if (efficiencyFactor === 0) {
      setErrorMessage("ККД не може бути 0%.");
      return;
    }
    const requiredEnergy = totalEnergy / efficiencyFactor;
    const maxCurrent = requiredEnergy / Number(voltage);
    const recommendation = `Рекомендована ємність: ${(requiredEnergy / Number(voltage)).toFixed(2)} А·год`;
    setRecommendations([{ type: selectedType, recommendation, maxCurrent, totalEnergy, requiredEnergy, models: recommendedDevices[selectedType] }]);
  };

  return (
    <div style={{overflow:"hidden"}} className="p-4 space-y-4 bg-blue-50 rounded-lg shadow-lg max-w-lg mx-auto">
      {errorMessage && (
        <Modal open={true} footer={null} onCancel={() => setErrorMessage(null)}>
          <p>{errorMessage}</p>
        </Modal>
      )}
      <Row gutter={16}>
        <Col span={12}>
          <div className="space-y-2">
            <Input placeholder="Назва пристрою" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="number" placeholder="Потужність (Вт)" value={power} onChange={(e) => setPower(e.target.value)} />
            <Input type="number" placeholder="Час роботи (год)" value={time} onChange={(e) => setTime(e.target.value)} />
            <Input type="number" placeholder="ККД (%)" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} />
            <Select value={selectedType} onChange={setSelectedType} className="w-full">
              <Select.Option value="battery">Акумулятор</Select.Option>
              <Select.Option value="generator">Генератор</Select.Option>
              <Select.Option value="ups">ДБЖ</Select.Option>
            </Select>
            <Button type="primary" onClick={addDevice}>Додати пристрій</Button>
          </div>
        </Col>
        <Col span={12}>
          <HelpSection />
        </Col>
      </Row>
      <Table 
        dataSource={devices.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        columns={[
          { title: "Назва", dataIndex: "name" },
          { title: "Потужність (Вт)", dataIndex: "power" },
          { title: "Час (год)", dataIndex: "time" },
          { title: "Дії", render: (_, record) => (
            <>
              <Button danger onClick={() => removeDevice(record.id)}>Видалити</Button>
              <Button onClick={() => generateReport(record)}>Завантажити звіт</Button>
            </>
          ) }
        ]}
        rowKey="name"
        pagination={false}
      />
      
      {recommendations.length > 0 && (
        <div className="bg-white p-4 rounded-md shadow-md">
          <p>{recommendations[0].recommendation} (Макс. струм: {recommendations[0].maxCurrent.toFixed(2)} A)</p>
          <p>Рекомендовані моделі: {recommendations[0].models.join(", ")}</p>
        </div>
      )}

        <Pagination className="floatPag" current={currentPage} pageSize={pageSize} total={devices.length} onChange={setCurrentPage} />
        <Button type="primary" onClick={calculate}>Розрахувати</Button>
    </div>
  );
}
