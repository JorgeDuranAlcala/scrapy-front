
interface TabPanelProps {
  children?: JSX.Element;
  activeTab: string;
  value: string;
}


const TabPanel = (props: TabPanelProps) => {
  const { children, value, activeTab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== activeTab}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      {...other}
    >
      {value === activeTab && children}
    </div>
  );
}

export default TabPanel

