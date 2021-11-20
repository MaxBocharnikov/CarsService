import styled from 'styled-components';
import Timeline from 'react-calendar-timeline'
import colors from '../../../constants/styles/colors';
import fonts from '../../../constants/styles/fonts';

const Wrapper = styled.div`
    position: relative;
`;

const Note = styled.p`
    position: absolute;
    left: 0;
    top: -6px;
    font-weight: 600;
    font-size: ${fonts.primary};
    color: ${colors.black};
    z-index: 1;
`;

const _TimeLinePicker = styled(Timeline)`
    .rct-header-root {
        background: #DED9CC;
        position: relative; 
         >*:first-child {
             background: ${colors.white};
             border-right: none;
         }    
    }
    
    .rct-dateHeader-primary {
        color: #993707;
    }
    
    .rct-dateHeader {
        border: none;
    }
    
    
    .rct-calendar-header { 
         border: none; 
         
         >*:first-child {
            display: none;
         }
         
         div {
            background: ${colors.white};
            font-size: ${fonts.primary};
            padding-bottom: 20px;
            color: ${colors.black};
            font-weight: 600;
         }
    }
    
    .rct-header-root {
        border-bottom: 1px solid ${colors.gray};
        
         >*:first-child {
            border: none;
         }
    }
    
    &&& {
         .rct-sidebar-row {
            background: ${colors.white};
            font-size: ${fonts.primary};
            color: ${colors.black};
            font-weight: 600;
            border: none;
            border-bottom: 1px solid ${colors.gray};
        }
        
        .rct-sidebar {
            border: none;     
        }
        
        .rct-vertical-lines .rct-vl.rct-day-6, .react-calendar-timeline .rct-vertical-lines .rct-vl.rct-day-0 {
            background: none;
        }
        
        
        .rct-horizontal-lines .rct-hl-even, .rct-horizontal-lines .rct-hl-odd {
            background: ${colors.white};
            border-bottom: 1px solid ${colors.gray};
        } 
        
        .rct-vertical-lines .rct-vl {
            border: none !important;
        }
        
        .rct-item  {
          background: ${colors.purple} !important;
          border-radius: 6px;
          font-size: ${fonts.primary};
          
          .rct-item-content {
            display: flex;
            flex-direction: column;
            line-height: 12px;
            font-size: ${fonts.primary};
            color: ${colors.white};
            .title {
                margin-top: 8px;
                margin-bottom: 5px;
            }
            
            .time {
               color: ${colors.darkGray};
            ]
            
          }
          
          
        }
       
    }
   
   
   
`;

const S = { _TimeLinePicker, Note, Wrapper };

export default S;

