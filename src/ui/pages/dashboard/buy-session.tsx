import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function BuySessionPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">{'test'}</div>
  );
}
