import "./tabs.scss"
import { useState, ReactNode } from 'react';

interface TabsProps {
  children: ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <div className="tabs__buttons">
        {children.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => handleTabClick(index)}
          >
            {(tab as React.ReactElement).props.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {children[activeTab]}
      </div>
    </div>
  );
}

export default Tabs;
