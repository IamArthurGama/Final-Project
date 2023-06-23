drop database fpdb;

create database fpdb;

use fpdb;


/*Selects Gerais*/
select * from pedidos;
select * from cardapios;
select * from usuarios;



/*Insert para Usuários*/
insert into usuarios(id, email, nome, telefone, endereco, senha, ativoAdm, ativo, createdAt, updatedAt) values 
('1', 'a@a', 'Administrador', '11111111111', 'xxxx', '0cc175b9c0f1b6a831c399e269772661', '1', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');

insert into usuarios(id, email, nome, telefone, endereco, senha, ativoAdm, ativo, createdAt, updatedAt) values 
('2', 'fun@a', 'Funcionário', '11111111111', 'xxxx', '0cc175b9c0f1b6a831c399e269772661', '2', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');

insert into usuarios(id, email, nome, telefone, endereco, senha, ativoAdm, ativo, createdAt, updatedAt) values 
('3', 'cliente@a', 'Cliente', '11111111111', 'xxxx', '0cc175b9c0f1b6a831c399e269772661', '0', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');



/*Insert para Cardápio*/
insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values 
('1', 'X-tudo', 'Pão, carne, queijo, bacon, salada, ovo.', '/images/1.jpg', '/images/1.jpg', '29.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');

insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values 
('2', 'X-Salada', 'Pão, carne, queijo, bacon, salada.', '/images/2.jpg', '/images/2.jpg', '24.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');

insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values 
('3', 'X-Bacon', 'Pão, carne, queijo, bacon.', '/images/3.jpg', '/images/3.jpg', '21.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');

insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values 
('4', 'X-Egg', 'Pão, carne, queijo e ovo.', '/images/4.jpg', '/images/4.jpg', '21.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');

insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values 
('5', 'Tradicional', 'Pão, carne, queijo e salada.', '/images/5.jpg', '/images/5.jpg', '19.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');


/*View listaPedidos*/
select 
u.nome as nomeCliente, u.endereco, u.telefone, 
c.nome as nomeCardapio, c.preco,
p.*, (c.preco*p.qtda) as total
from pedidos as p inner join usuarios as u on u.id = p.idUsuario inner join cardapios as c on c.id = p.idCardapio; 

drop view listaPedidos;

create view listaPedidos AS select 
u.nome as nomeCliente, u.endereco, u.telefone, 
c.nome as nomeCardapio, c.preco,
p.*, (c.preco*p.qtda) as total
from pedidos as p inner join usuarios as u on u.id = p.idUsuario inner join cardapios as c on c.id = p.idCardapio; 


select * from listaPedidos;

select idPedido, nomeCliente from listaPedidos group by idPedido order by createdAt desc;

select nomeCardapio, preco, qtda, total, status, endereco, telefone, nomeCliente from listapedidos where idPedido = '272182268458';




drop table pedidos;













update usuarios set ativoAdm = 1 where id=1;
update usuarios set ativoAdm = 2 where id=2;
update usuarios set ativoAdm = 0 where id=2;



drop table pedidos;


create view perfil as select
u.nome as nomeCliente, u.endereco, u.telefone, u.email, 
c.nome as nomeCardapio, c.preco,
p.*, (c.preco*p.qtda) as total
from pedidos as p inner join usuarios as u on u.id = p.idUsuario inner join cardapios as c on c.id = p.idCardapio; 

drop view perfil;

select idPedido, idUsuario, nomeCliente, endereco, telefone, email from perfil group by idPedido order by createdAt desc;
