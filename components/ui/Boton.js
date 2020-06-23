import styled from '@emotion/styled'
const Boton = styled.a`
font-weight:700;
text-transform:uppercase;
border:1px  solid #d1d1d1;
padding: .8rem 2rem ;
padding-top:2rem;
padding-bottom:2rem;
background-color: ${props => props.bgColor ? '#da552f' : 'white'};
color:${props => props.bgColor ? 'white' : '#000'}  ;
margin:2rem auto;
display:block;
text-align:center;

&:last-of-type{
    margin-right:0;
}

&:hover{
    cursor: pointer;
}
`; 

export default Boton;