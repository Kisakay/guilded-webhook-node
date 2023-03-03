require('dotenv').config();
const fs = require('fs').promises;
const { Webhook, MessageBuilder } = require('../src');

const hook = new Webhook("");

const IMAGE_URL = '';

hook.setUsername('Guilded Webhook Node Name');
hook.setAvatar(IMAGE_URL);

describe('Custom hooks', function(){
    it('Sends embed', function(done){
        const embed = new MessageBuilder();

        embed.setText('Text')
        .setAuthor('guilded Webhook Node Author', IMAGE_URL, 'https://npmjs.org/package/guilded-webhook-node')
        .setTitle('Title')
        .setURL('https://npmjs.org/package/guilded-webhook-node')
        .setImage(IMAGE_URL)
        .setThumbnail(IMAGE_URL)
        .setColor('#00b0f4')
        .addField('Field #1', 'Not inline')
        .setDescription('Description')
        .setFooter('Footer', IMAGE_URL)
        .setTimestamp();

        hook.send(embed).then(() => {
            done();
        })
        .catch(err => done(err));
    });

    it('Sends file', function(done){
        fs.writeFile('./test/customfile.txt', 'Message from guilded-webhook-node').then(() => {
            hook.sendFile('./test/customfile.txt').then(() => {
                fs.unlink('./test/customfile.txt');

                done();
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });

    it('Sends text to webhook', function(done){
        hook.send('Plain text').then(() => {        
            done();
        })
        .catch(err => done(err));
    });
});

describe('Preset hooks', function(){
    it('info', function(done){
        hook.info('Info', 'Field name', 'Field value').then(() => {
            done();
        })
        .catch(err => done(err));
    });
    
    it('success', function(done){
        hook.success('Success', 'Field name', 'Field value').then(() => {
            done();
        })
        .catch(err => done(err));
    });

    it('warning', function(done){
        hook.warning('Warning', 'Field name', 'Field value').then(() => {
            done();
        })
        .catch(err => done(err));
    });

    it('error', function(done){
        hook.error('error', 'Field name', 'Field value').then(() => {
            done();
        })
        .catch(err => done(err));
    });
});