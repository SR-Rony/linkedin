import React from 'react'
import Container from '../container/Container'
import Paragraph from '../paragraph/Paragraph'
import List from '../list/List'
import ListItem from '../list/ListItem'

const Footer = () => {
  return (
    <footer>
        <Container>
            <div className="grid grid-cols-7 bg-gray-900 p-10 mt-5">
                <div className="col-span-1 text-white">
                    <Paragraph text='About'/>
                    <List className='text-base mt-5'>
                        <ListItem className='my-2 hover:text-primary' text='Community Guidelines'/>
                        <ListItem className='my-2 hover:text-primary' text='Privacy & Terms '/>
                        <ListItem className='my-2 hover:text-primary' text='Sales Solutions'/>
                        <ListItem className='my-2 hover:text-primary' text='Safety Center'/>
                    </List>
                </div>
                <div className="col-span-1 text-white">
                    <Paragraph text='Accessibility'/>
                    <List className='text-base mt-5'>
                        <ListItem className='my-2 hover:text-primary' text='Careers'/>
                        <ListItem className='my-2 hover:text-primary' text=' Ad Choices'/>
                        <ListItem className='my-2 hover:text-primary' text='Mobile'/>
                    </List>
                </div>
                <div className="col-span-1 text-white">
                    <Paragraph text='Talent Solutions'/>
                    <List className='text-base mt-5'>
                        <ListItem className='my-2 hover:text-primary' text='Marketing Solutions'/>
                        <ListItem className='my-2 hover:text-primary' text='Advertising '/>
                        <ListItem className='my-2 hover:text-primary' text='Sales Solutions'/>
                        <ListItem className='my-2 hover:text-primary' text='Small Business'/>
                    </List>
                </div>
                <div className="col-span-2 text-white">
                    <div>
                        <Paragraph text='Questions?'/>
                        <List >
                            <ListItem className='hover:text-primary' text='Visit our Help Center.'/>
                        </List>
                    </div>
                    <div className='my-5'>
                        <Paragraph text='Manage your account and privacy'/>
                        <List>
                            <ListItem className='hover:text-primary' text='Visit our Help Center.'/>
                        </List>
                    </div>
                    <div className='my-5'>
                        <Paragraph text='Recommendation transparency'/>
                        <List>
                            <ListItem className='hover:text-primary' text='Visit our Help Center.'/>
                        </List>
                    </div>
                </div>
                <div className="col-span-2 text-white">
                    <Paragraph text='Select Language'/>
                    <input className='w-full p-3 ring-2 ring-primary mt-5' type="text" name="" placeholder='Select Language' />
                </div>
            </div>
        </Container>
    </footer>
  )
}

export default Footer