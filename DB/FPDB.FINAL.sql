drop database fpdb;

create database fpdb;

use fpdb;


insert into usuarios(id, email, nome, telefone, endereco, senha, ativoAdm, ativo, createdAt, updatedAt) values 
('1', 'a@a', 'nome', '11111111111', 'xxxx', '0cc175b9c0f1b6a831c399e269772661', '1', '1',"2023-06-01 21:18:58","2023-06-01 21:18:58");


update usuarios set ativoAdm = 1 where id=1;
update usuarios set ativoAdm = 2 where id=2;
update usuarios set ativoAdm = 0 where id=2;

update usuarios set ativoAdm = 1 where id=1;

select * from pedidos;

select * from cardapios;
select * from usuarios;

drop table pedidos;

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


create view perfil as select
u.nome as nomeCliente, u.endereco, u.telefone, u.email, 
c.nome as nomeCardapio, c.preco,
p.*, (c.preco*p.qtda) as total
from pedidos as p inner join usuarios as u on u.id = p.idUsuario inner join cardapios as c on c.id = p.idCardapio; 

drop view perfil;

select idPedido, idUsuario, nomeCliente, endereco, telefone, email from perfil group by idPedido order by createdAt desc;
