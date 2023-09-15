import s from './Button.module.css'
import cn from 'classnames'

const Button = ({children, onClick, type}) => {
  return (
    <button onClick={(e) => {
      e.preventDefault()
      onClick()
    }


    } className={cn(s.btn, {[s.back]: type === 'back', [s.primary]: type === 'primary', [s.position]: type === 'position'})}>
      {children}
    </button>
  );
};

export default Button;
