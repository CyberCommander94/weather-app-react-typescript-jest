import "./info-tabs.scss"
import { useState, ReactNode } from 'react';

interface InfoTabsProps {
  children: ReactNode[];
}

const InfoTabs: React.FC<InfoTabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tabs">
        {children.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => handleTabClick(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children[activeTab]}
      </div>
    </div>
  );
}

export default InfoTabs;
