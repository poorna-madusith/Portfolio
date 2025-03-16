import { ExternalLink } from 'lucide-react';
import MediaButton from './MediaButton';

const Header = () => {
  return (
    <header>
      <div className="flex gap-4 items-center justify-center mt-6">
        <MediaButton 
          href="/Portfolio/assets/cv/mycv.pdf"
          label="View CV"
          icon={<ExternalLink size={18} />}
        />
      </div>
    </header>
  );
};

export default Header;
