import { Tabs, Tab, Paper } from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import ExploreIcon from '@mui/icons-material/Explore';
import HelpIcon from '@mui/icons-material/Help';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        centered
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          icon={<RecommendIcon />}
          label="Recommendations"
          value="recommendations"
        />
        <Tab
          icon={<ExploreIcon />}
          label="Content Explorer"
          value="explorer"
        />
        <Tab
          icon={<HelpIcon />}
          label="Feature Guide"
          value="guide"
        />
      </Tabs>
    </Paper>
  );
};

export default Navigation; 