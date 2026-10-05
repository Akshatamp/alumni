import { Link as RouterLink } from 'react-router-dom';

export default function AlumniLink({ href, ...props }) {
  return <RouterLink to={href} {...props} />;
}
