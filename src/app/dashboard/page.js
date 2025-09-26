'use client';
import ScrollStack, { ScrollStackItem } from '../../components/ScrollStack'

export default function dashboard(){
    return (
    <div className='relative z-[15] h-screen overflow-hidden'>
          
          <ScrollStack >
  <ScrollStackItem>
    <h2>Card 1</h2>
    <p>This is the first card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 2</h2>
    <p>This is the second card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 3</h2>
    <p>This is the third card in the stack</p>
  </ScrollStackItem>
</ScrollStack>

</div>

)}